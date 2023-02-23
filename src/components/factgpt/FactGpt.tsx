import React, { useState, useEffect } from "react";
import Page from "../global/utility/Page";
import { useRouter } from "next/router";
import modules from "../../data/modules";
import Preamble from "./Preamble";
import ModuleChat from "./ModuleChat";

export default function FactGpt() {
  const router = useRouter();

  const [selectedModule, setSelectedModule] = useState(modules["general"]);

  useEffect(() => {
    const key: any =
      router.query.module ||
      router.asPath.match(new RegExp(`[&?]module=(.*)(&|$)`));

    if (!key) {
      setSelectedModule(modules["general"]);
    } else {
      setSelectedModule(modules[key as keyof typeof modules]);
    }
  }, [router.query]);
  return (
    <div>
      {selectedModule ? (
        <div>
          <Preamble module={selectedModule} />
          <ModuleChat
            modules={(selectedModule.module == "all"
              ? Object.values(modules).map((m: any) => {
                if (m.module == "all") return;
                return { title: m.module, displayName: m.title, active: true, fixed: true };
              })
              : Object.values(modules).map((m: any) => {
                if (m.module == "all") return;
                return {
                  title: m.module,
                  displayName: m.title,
                  active: selectedModule.module == m.module,
                  fixed: true,
                };
              })
            ).filter((m: any) => m)}
          />
        </div>
      ) : (
        <div className="h-screen"></div>
      )}
    </div>
  );
}
