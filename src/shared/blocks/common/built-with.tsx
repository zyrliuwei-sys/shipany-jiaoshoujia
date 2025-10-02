import { Button } from "@/shared/components/ui/button";
import Link from "next/link";

export function BuiltWith() {
  return (
    <Button asChild variant="outline" size="sm" className="hover:bg-primary/10">
      <Link href="https://shipany.ai" target="_blank">
        Built with ❤️ ShipAny
      </Link>
    </Button>
  );
}
