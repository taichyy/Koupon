import { NextResponse } from "next/server";
import puppeteer from 'puppeteer';

import { meals } from "@/constants";

export async function GET() {

    // Define array for responsing
    let responseArr = []

    // Coupon range
    const fromId = 13310
    const toId = 13320

    for (let coupon = fromId; coupon <= toId; coupon++) {
        try {
            // Try to fetch coupon
            const res = await fetch(`https://www.kfcclub.com.tw/GetCouponData/${coupon}`, {
                method: 'GET',
            })

            if (res.ok) {

                // Get returned HTML text
                let responseText = await res.text();

                // If the coupon exists (includes <Coupon>)
                if (responseText.includes('<Coupon>')) {

                    // Get current date
                    const date = new Date()
                    const nowYear = date.getFullYear().toString()
                    let nowMonth = (date.getMonth()+1).toString()
                    nowMonth.length == 1 ? nowMonth = '0'+nowMonth : null;
                    const nowDate = date.getDate().toString()
                    const nowFull = nowYear+nowMonth+nowDate

                    // Get expiration date (value of <EndDate>)
                    const indexExpF = responseText.indexOf('<EndDate>')+9
                    const indexExpB = responseText.indexOf('</EndDate>')
                    const fullTime = responseText.substring(indexExpF, indexExpB)
                    const expireDate = fullTime.split(' ')[0].replaceAll('-','')

                    // If not expired
                    if ( nowFull < expireDate) {

                        // Get coupon name
                        const indexNameF = responseText.indexOf('<Title>')+7
                        const indexNameB = responseText.indexOf('</Title>')
                        const name = responseText.substring(indexNameF, indexNameB).split('-')[1]

                        // Get product code
                        const indexCodeF = responseText.indexOf('<ProductCode>')+13
                        const indexCodeB = responseText.indexOf('</ProductCode>')
                        const code = responseText.substring(indexCodeF, indexCodeB)

                        // Get delivery
                        let delivery;
                        const patternDelivery = /<Delivery>(.*?)<\/Delivery>/;
                        const matchesDelivery = patternDelivery.exec(responseText);
                        if (matchesDelivery && matchesDelivery.length >= 2) {
                            delivery = matchesDelivery[1].toLowerCase();
                        }

                        // Get takeout
                        let takeout;
                        const patternTakeout = /<TakeOut>(.*?)<\/TakeOut>/;
                        const matchesTakeout = patternTakeout.exec(responseText);
                        if (matchesTakeout && matchesTakeout.length >= 2) {
                            takeout = matchesTakeout[1].toLowerCase();
                        }

                        // Get price
                        let price;
                        // Define the URL and headers for the fetch request
                        const url = `https://www.kfcclub.com.tw/meal/${code}`;
                        
                        // Define the cookies
                        const cookies = {
                            'ASP.NET_SessionId': '1mjvrbway1wmie0mjfawojiv',
                            'GCLB': 'CPudoaLhxtPUdw',
                            'OrderTypeCheck': '2',
                        }
                    
                        // Convert cookies to a string
                        const cookieString = Object.entries(cookies)
                            .map(([key, value]) => `${key}=${value}`)
                            .join('; ');
                    
                        // Define the headers for the fetch request
                        const headers = {
                            'Cookie': cookieString,
                        };
                    
                        // Send a GET request with headers
                        const response = await fetch(url, { headers })
                        const resText = await response.text()

                        const patternPrice = /<span class="integer">(.*?)<\/span>/;
                        const matchesPrice = patternPrice.exec(resText);
                        if (matchesPrice && matchesPrice.length >= 2) {
                            price = matchesPrice[1].toLowerCase();
                        }
         

                        responseArr.push({
                            coupon,
                            code,
                            name,
                            delivery,
                            takeout,
                            price,
                            expireDate
                        });
                    }
                }
            }
        // If coupon doesn't exist
        } catch (err) {
            console.log(err)
            return NextResponse.json('Error',{
                status : 500
            });
        }
    }

    return NextResponse.json(responseArr);
}
