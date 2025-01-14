import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

interface SelectDemoProps {
   onSelectChange: (value: string) => void;
}

export function SelectDemo({ onSelectChange }: SelectDemoProps) {
   const handleSelectChange = (value: any) => {
      onSelectChange(value);
   };

   return (
      <Select onValueChange={handleSelectChange}>
         <SelectTrigger className="w-full md:w-1/3 bg-white">
            <SelectValue placeholder="Category" />
         </SelectTrigger>
         <SelectContent>
            <SelectGroup>
               <SelectLabel>Category</SelectLabel>
               <SelectItem value="business">Business</SelectItem>
               <SelectItem value="entertainment">Entertainment</SelectItem>
               <SelectItem value="general">General</SelectItem>
               <SelectItem value="health">Health</SelectItem>
               <SelectItem value="science">Science</SelectItem>
               <SelectItem value="sports">Sports</SelectItem>
               <SelectItem value="technology">Technology</SelectItem>
            </SelectGroup>
         </SelectContent>
      </Select>
   );
}
