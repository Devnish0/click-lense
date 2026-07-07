import { Button } from "@base-ui/react/button";
export default function Header() {
  return (
    <header className="flex items-center justify-center w-full border-blue-500 border">
      <div className="flex justify-between border-2 w-full px-5">
        <ul className="flex items-center gap-10">
          <li className="text-2xl font-bold">Clause</li>
          <li className="font-light text-[0.9rem]">solutions</li>
          <li className="font-light text-[0.9rem]">project</li>
          <li className="font-light text-[0.9rem]">basics</li>
        </ul>
        <div></div>
      </div>
    </header>
  );
}
