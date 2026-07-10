import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

                    // !analyticsEnabled && "opacity-40 pointer-events-none select-none filter grayscale-[30%]"

const ChooseUs = () => {
    return (
       <>
       <Card className={cn(
                    "w-full  overflow-hidden transition-all duration-300 border border-border/80 bg-card/60 backdrop-blur-md shadow-sm rounded-xl")}>
                    <div className="p-4 border-b border-border/40 bg-muted/20">
                      <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                        Why choose
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        How we stack up against traditional link shorteners.
                      </p>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-border/40 text-[11px] uppercase tracking-wider text-muted-foreground/80 bg-muted/10 font-bold">
                            <th className="py-2.5 px-4 font-semibold">Features</th>
                            <th className="py-2.5 px-4 font-semibold text-center w-24">Others</th>
                            <th className="py-2.5 px-4 font-semibold text-center w-24 text-primary">Us</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20 text-xs">
                          {/* Row 1: Fast Creation Flow */}
                          <tr className="hover:bg-muted/5 transition-colors">
                            <td className="py-3 px-4">
                              <span className="font-medium text-foreground">Fast Creation Flow</span>
                              <p className="text-[11px] text-muted-foreground mt-0.5">Paste → Shorten → Done. Minimal friction.</p>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <X className="w-4 h-4 mx-auto text-muted-foreground/40" />
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Check className="w-4 h-4 mx-auto text-green-500 font-bold" />
                            </td>
                          </tr>

                          {/* Row 2: Real-time Analytics */}
                          <tr className="hover:bg-muted/5 transition-colors">
                            <td className="py-3 px-4">
                              <span className="font-medium text-foreground">Real-time Analytics</span>
                              <p className="text-[11px] text-muted-foreground mt-0.5">Track clicks, country, browser, device, OS, & referrer.</p>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono">Basic</span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Check className="w-4 h-4 mx-auto text-green-500 font-bold" />
                            </td>
                          </tr>

                          {/* Row 3: Custom branded Slugs */}
                          <tr className="hover:bg-muted/5 transition-colors">
                            <td className="py-3 px-4">
                              <span className="font-medium text-foreground">Custom branded Slugs</span>
                              <p className="text-[11px] text-muted-foreground mt-0.5">e.g. <span className="font-mono text-green-600 dark:text-green-400">kingxgrow.site/docs</span> vs random strings.</p>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <X className="w-4 h-4 mx-auto text-muted-foreground/40" />
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Check className="w-4 h-4 mx-auto text-green-500 font-bold" />
                            </td>
                          </tr>

                          {/* Row 4: QR Code Generation */}
                          <tr className="hover:bg-muted/5 transition-colors">
                            <td className="py-3 px-4">
                              <span className="font-medium text-foreground">QR Code Generation</span>
                              <p className="text-[11px] text-muted-foreground mt-0.5">Every short link comes with a downloadable QR code.</p>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <X className="w-4 h-4 mx-auto text-muted-foreground/40" />
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Check className="w-4 h-4 mx-auto text-green-500 font-bold" />
                            </td>
                          </tr>

                          {/* Row 5: Password Protection & Expiration */}
                          <tr className="hover:bg-muted/5 transition-colors">
                            <td className="py-3 px-4">
                              <span className="font-medium text-foreground">Password & Expiration</span>
                              <p className="text-[11px] text-muted-foreground mt-0.5">Restrict access & auto-disable links dynamically.</p>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono">Premium</span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Check className="w-4 h-4 mx-auto text-green-500 font-bold" />
                            </td>
                          </tr>

                          {/* Row 6: Beautiful UX */}
                          <tr className="hover:bg-muted/5 transition-colors">
                            <td className="py-3 px-4">
                              <span className="font-medium text-foreground">Beautiful UX</span>
                              <p className="text-[11px] text-muted-foreground mt-0.5">Modern, clean interface inspired by Linear and Vercel.</p>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <X className="w-4 h-4 mx-auto text-muted-foreground/40" />
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Check className="w-4 h-4 mx-auto text-green-500 font-bold" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Card>
       </>
    )
}

export default ChooseUs