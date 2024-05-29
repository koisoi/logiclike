import "@/ui/styles/globals.scss";
import type { AppProps } from "next/app";
import { Nunito } from "next/font/google";

const font = Nunito({
    subsets: ["latin", "cyrillic", "cyrillic-ext"],
    weight: ["800"],
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <style jsx global>{`
                :root {
                    --font: ${font.style.fontFamily};
                }
            `}</style>
            <Component {...pageProps} />
        </>
    );
}
