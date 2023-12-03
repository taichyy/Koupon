import Image from "next/image";

import MainTable from "@/components/main-table";

export default function Home() {
    return (
    <div>
        <div className="bg-rose-950 px-3 py-3 text-white flex items-center">
            <Image
                src="/logo.png"
                alt="Koupon logo"
                width={60}
                height={60}
            />
            <div>
                <h1 className="text-xl font-semibold">愛吃基魔人</h1>
                <h2 className="text-xs font-semibold tracking-widest">最完整的肯德基優惠券一手資料</h2>
            </div>
        </div>
        <MainTable />

    </div>
    )
  }
  