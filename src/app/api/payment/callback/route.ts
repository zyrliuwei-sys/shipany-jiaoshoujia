import { redirect } from 'next/navigation';

import { envConfigs } from '@/config';
import { PaymentType } from '@/extensions/payment';
import { findOrderByOrderNo } from '@/shared/services/order';
import {
  getPaymentService,
  handleCheckoutSuccess,
} from '@/shared/services/payment';
import { getUserInfo } from '@/shared/services/user';

export async function GET(req: Request) {
  let redirectUrl = '';

  try {
    // get callback params
    const { searchParams } = new URL(req.url);
    const orderNo = searchParams.get('order_no');

    if (!orderNo) {
      throw new Error('invalid callback params');
    }

    // get sign user
    const user = await getUserInfo();
    if (!user || !user.email) {
      throw new Error('no auth, please sign in');
    }

    // get order
    const order = await findOrderByOrderNo(orderNo);
    if (!order) {
      throw new Error('order not found');
    }

    // validate order and user
    if (!order.paymentSessionId || !order.paymentProvider) {
      throw new Error('invalid order');
    }

    if (order.userId !== user.id) {
      throw new Error('order and user not match');
    }

    const paymentService = await getPaymentService();

    const paymentProvider = paymentService.getProvider(order.paymentProvider);
    if (!paymentProvider) {
      throw new Error('payment provider not found');
    }

    // get payment session
    const session = await paymentProvider.getPaymentSession({
      sessionId: order.paymentSessionId,
    });

    await handleCheckoutSuccess({
      order,
      session,
    });

    redirectUrl =
      order.callbackUrl ||
      (order.paymentType === PaymentType.SUBSCRIPTION
        ? `${envConfigs.app_url}/settings/billing`
        : `${envConfigs.app_url}/settings/payments`);
  } catch (e: any) {
    console.log('checkout callback failed:', e);
    redirectUrl = `${envConfigs.app_url}/pricing`;
  }

  redirect(redirectUrl);
}
