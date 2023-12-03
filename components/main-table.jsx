"use client"
import useSWR from "swr";
import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const MainTable = () => {

    const items = [{
        nameCH : "炸雞",
        nameEN : "fried-chicken"
    },{
        nameCH : "蛋塔",
        nameEN : "egg-tower"
    },{
        nameCH : "薯條",
        nameEN : "french-fries"
    },{
        nameCH : "雞塊",
        nameEN : "chicken-nugget"
    },{
        nameCH : "漢堡",
        nameEN : "burger"
    },{
        nameCH : "紙包雞",
        nameEN : "bbq-chicken"
    },{
        nameCH : "飲料",
        nameEN : "drink"
    },{
        nameCH : "雞捲",
        nameEN : "chicken-roll"
    }]

    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error, isLoading } = useSWR('/api/coupons', fetcher)

    const loading = false

    return (
    <main>
        <nav className=" px-4 py-3">
            {items.map( (item, index) => (
                <Badge className="rounded-xl mr-2 mb-2 text-sm" key={index}>
                    {item.nameCH}
                </Badge> 
            ))}
        </nav>
        <Separator className="w-11/12 mx-auto bg-rose-500"/>
        <div className="flex w-11/12 mx-auto my-4 max-w-sm items-center gap-1.5">
            <Search size={22} />
            <Input type="email" id="email" placeholder="我想吃......" />
        </div>
        <div>
            {loading ? (
                <div></div>
            ) : (
                data?.map( coupon => (
                    <Card key={coupon.coupon} className="w-11/12 my-4 mx-auto">
                        <CardHeader>
                        <CardTitle>
                            {coupon.name}
                        </CardTitle>
                        <CardDescription>
                            ~
                            {coupon.expireDate.slice(0,4)}/
                            {coupon.expireDate.slice(4,6)}/
                            {coupon.expireDate.slice(6,8)}
                        </CardDescription>
                        </CardHeader>
                        {/* <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter> */}
                    </Card>
                ))
            )}
        </div>
    </main>       
        
    );
}
 
export default MainTable;