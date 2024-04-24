import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// You may need to import or define the Checkbox component if it’s in another file, or use it directly if it’s in the same file
// For example, if Checkbox is in the same file and defined like this:
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = 'Checkbox';

interface LabeledCheckboxProps {
    label: string;
    name: string; 
    checked: boolean;
    onCheckedChange: (checked: boolean) => void; // Ensure this is expecting a boolean
  }

  const LabeledCheckbox = React.forwardRef<HTMLButtonElement, LabeledCheckboxProps>(
    ({ label, name, checked, onCheckedChange }, ref) => (
      <label className="flex items-center space-x-2">
        <Checkbox
          checked={checked}
          onCheckedChange={(checked: boolean) => onCheckedChange(checked)} // Ensure the function handles a boolean
          name={name}
          ref={ref}
        />
        <span>{label}</span>
      </label>
    )
  );

LabeledCheckbox.displayName = 'LabeledCheckbox';

export { LabeledCheckbox };
