import Errorpage from "@/app/components/errorpage";

export default async function ExpiredPage({searchParams}: {searchParams:Promise<{code:string}>}){
    const code = (await searchParams).code
    return(
        <>
       
        <Errorpage type="expired" code={code}/>
        </>
    )
}