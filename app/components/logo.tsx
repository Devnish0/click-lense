import { cn } from "@/lib/utils"

interface logoTypes{
    size?: "sm" | "md" | "lg" | "xl"
    variant?: "solid" | "outline"
}

export default function Logo({size}:logoTypes){
    return(
        <span className={cn(" rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-black select-none",size=="sm"?"h-7 w-7 text-sm":"h-7 w-7 text-sm", size=="md"?"h-10 w-10 text-sm":"h-7 w-7 text-sm", size=="lg"?"h-12 w-12 text-2xl":"h-7 w-7 text-sm")}>
            C
        </span>
    )
}