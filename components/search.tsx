import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";

export function InputInline() {
  return (
    <Field orientation="horizontal">
      <div className="relative flex-1">
        <HugeiconsIcon
          icon={Search01Icon}
          strokeWidth={2}
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input type="search" placeholder="Search URLs here" className="pl-9" />
      </div>
      <Button className="cursor-pointer">Search</Button>
    </Field>
  );
}
