import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function Footer(){
    return (<footer className="fixed bottom-0 w-full  border-t">
        <div className="flex py-6 items-center justify-center">
            <h6 className="font-extrabold font-sans text-primary">Clause</h6>
            {/* <p className="text-center text-sm text-primary/70 font-sans font-normal">Build with ❤️ by Nishank</p> */}
        </div>
    </footer>
    )
}