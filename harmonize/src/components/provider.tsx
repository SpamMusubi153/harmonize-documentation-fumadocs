'use client';
import { RootProvider } from "fumadocs-ui/provider";

import OfflineSearchDialog from "@/components/search";
import type { ReactNode } from "react";


export function Provider({ children }: { children: ReactNode }) {
    return (
        <RootProvider
            search={{
                SearchDialog: OfflineSearchDialog,
            }}
        >
            {children}
        </RootProvider>
    );
}