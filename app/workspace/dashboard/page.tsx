// import LinkComponent from "@/components/linkcomponent";
import LinkComponent from "@/components/linkcomponent";
import { InputInline } from "@/components/search";

export default function Page() {
  const data = [
    {
      shortcode: "hey",
      originalUrl: "https://google.com",
      Password: true,
      expiresAt: "12pm",
    },
    {
      shortcode: "hello",
      originalUrl: "https://github.com",
      Password: false,
      expiresAt: "12pm",
    },
    {
      shortcode: "world",
      originalUrl: "https://stackoverflow.com",
      Password: true,
      expiresAt: "12pm",
    },
    {
      shortcode: "aey",
      originalUrl: "https://google.com",
      Password: true,
      expiresAt: "12pm",
    },
    {
      shortcode: "bey",
      originalUrl: "https://google.com",
      Password: true,
      expiresAt: "12pm",
    },
    {
      shortcode: "dey",
      originalUrl: "https://google.com",
      Password: true,
      expiresAt: "12pm",
    },
  ];
  return (
    <>
      <main className="w-full min-h-[93vh] border ">
        <div className="w-full pt-3 lg:px-18 px-2 flex flex-col h-full border ">
          <div className="text-4xl font-serif italic w-full">Your URLs</div>
          <div className=" hidden w-full border-t border-secondary/20"></div>
          <div className="w-full mt-7">
            <span className="w-20">
              <InputInline />
            </span>
          </div>
          <div className="mt-3 pl-1 font-extralight text-xs text-secondary/70">
            Projects
          </div>
          {/* {data.map((link) => {
              return (
                <LinkComponent
                  key={link.shortcode}
                  Password={link.Password}
                  expiresAt={link.expiresAt}
                  originalURL={link.originalUrl}
                  shortcode={link.shortcode}
                />
              );
            }} */}
          {data.length > 0 ? (
            <div className="w-full border rounded-sm mt-3 border-border/70 ">
              {data.map((link) => {
                return (
                  <LinkComponent
                    key={link.shortcode}
                    Password={link.Password}
                    expiresAt={link.expiresAt}
                    originalURL={link.originalUrl}
                    shortcode={link.shortcode}
                  />
                );
              })}
            </div>
          ) : (
            // </div>

            <div className="w-full flex items-center justify-center grow pb-30">
              <p className="text-secondary/50">create your first url</p>
            </div>
          )}
          <div className=""></div>
        </div>
      </main>
    </>
  );
}
