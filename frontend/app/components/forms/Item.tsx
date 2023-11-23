import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type ItemProps = {
  field: any;
  inputClassName?: string;
  label: string;
  description: string;
  placeholder?: string;
};

const Item = ({
  field,
  inputClassName,
  label,
  description,
  placeholder,
}: ItemProps) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input className={inputClassName} placeholder={placeholder} {...field} />
      </FormControl>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
};

export default Item;
