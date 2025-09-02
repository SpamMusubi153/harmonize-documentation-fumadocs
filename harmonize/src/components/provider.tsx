
import { RootProvider } from "fumadocs-ui/provider";

import DefaultSearchDialog from "@/components/search";
import type { ReactNode } from "react";


export function Provider({ children }: { children: ReactNode }) {
    return (
        <RootProvider
            search={{
                DefaultSearchDialog,
            }}
        >
            {children}
        </RootProvider>
    )
}