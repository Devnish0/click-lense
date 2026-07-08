import { Button } from "@/components/ui/button"
import { ChevronRight, Heart } from "lucide-react"

export default function Footer(){
    return (<footer className="fixed bottom-0 w-full border-t bg-background/80 backdrop-blur-sm border-border/50 ">
        <div className="flex py-6 items-center justify-center gap-3 flex-col">
            <div className="flex lg:flex-row lg:justify-around lg:w-full flex-col items-center justify-center gap-3">
                <div className="flex items-center gap-1">
                    <h6 className="font-extrabold font-sans text-primary">Clause</h6>
                    <span className="text-slate-400/50">|</span>
                    <p className="text-secondary font-medium text-[12px]   ">© 2026 Clause. All rights reserved.</p>
                </div>
                <div className="flex gap-3">
                    <img src="/twitter.svg" alt="twitter" className="w-4 h-4 opacity-30 hover:opacity-100 transition-opacity" />
                    <img src="/github.svg" alt="github" className="w-4 h-4 opacity-30 hover:opacity-100 transition-opacity" />
                </div>
            </div>
            <span className=" flex  items-center justify-center gap-1">
            <p className="font-medium text-[12px] text-black/50">Built with</p>
            <Heart className="w-4 h-4 text-red-500 fill-red-500"/>
            <p className="font-medium text-[12px] text-black/50">by</p>
            <a href="https://github.com/Devnish0" className="font-extrabold text-[12px] text-black/80">Nishank</a>

            </span>
        </div>
    </footer>
    )
}