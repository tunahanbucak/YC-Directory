import React from "react";
import Ping from "./Ping";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

const View = async ({ id }: { id: string }) => {
  try {
    const { views: totalViews } = await client
      .withConfig({ useCdn: false })
      .fetch(STARTUP_VIEWS_QUERY, { id });

    const updatedData = await writeClient
      .patch(id)
      .set({ views: totalViews + 1 })
      .commit();

    console.log("Güncellenen Görüntülenme Sayısı:", updatedData.views);

    return (
      <div className="view-container">
        <div className="absolute -top-2 -right-2">
          <Ping />
        </div>
        <p className="view-text">
          <span className="font-black">
            Görüntülenmeler: {updatedData.views}
          </span>
        </p>
      </div>
    );
  } catch (error) {
    console.error("Görüntülenme sayısı güncellenemedi:", error);
    return (
      <div className="view-container">
        <p className="view-text text-red-500">
          Görüntülenme sayısı güncellenemedi.
        </p>
      </div>
    );
  }
};

export default View;
