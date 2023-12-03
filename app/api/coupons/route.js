import { NextResponse } from "next/server";

export async function GET() {

    // Define array for responsing
    let responseArr = []

    // Coupon range
    const fromId = 13302
    const toId = 13350

    for (let i = fromId; i <= toId; i++) {
        try {
            // Try to fetch coupon
            const res = await fetch(`https://www.kfcclub.com.tw/GetCouponData/${i}`, {
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
                    const expFull = fullTime.split(' ')[0].replaceAll('-','')

                    // Get coupon name
                    const indexNameF = responseText.indexOf('<Title>')+7
                    const indexNameB = responseText.indexOf('</Title>')
                    const name = responseText.substring(indexNameF, indexNameB)

                    // Get product code
                    const indexCodeF = responseText.indexOf('<ProductCode>')+13
                    const indexCodeB = responseText.indexOf('</ProductCode>')
                    const code = responseText.substring(indexCodeF, indexCodeB)

                    // If not expired
                    if ( nowFull < expFull) {
                        console.log(code)

                        // Get procucts
                        try {
                            // Define the cookies as an object for easier editing
                            const cookies = {
                                'ASP.NET_SessionId': 'a34papdvpdpu5nxphqwznxsa',
                                'GCLB': 'CMXsru-sjdPlFQ',
                                'OrderTypeCheck': '2',
                            };
                        
                            // Convert cookies to a string
                            const cookieString = Object.entries(cookies)
                                .map(([key, value]) => `${key}=${value}`)
                                .join('; ');
                        
                            // Define the headers for the fetch request
                            const headers = {
                                'Host': 'www.kfcclub.com.tw',
                                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0',
                                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                                'Accept-Language': 'zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3',
                                'Accept-Encoding': 'gzip, deflate, br',
                                'DNT': '1',
                                'Sec-GPC': '1',
                                'Connection': 'keep-alive',
                                'Cookie': cookieString,
                                'Upgrade-Insecure-Requests': '1',
                                'Sec-Fetch-Dest': 'document',
                                'Sec-Fetch-Mode': 'navigate',
                                'Sec-Fetch-Site': 'none',
                                'Sec-Fetch-User': '?1',
                                'TE': 'trailers',
                            };
                        
                            // Send a GET request with headers, then get HTML from response
                            const response = await fetch(`https://www.kfcclub.com.tw/meal/${code}`, { 
                                headers 
                            });
                            const htmlContent = await response.text();
                        
                            // Fetching products code using JavaScript regex exec()
                            let match;
                            let products = [];
                            const regex = /<div id="divMtype_([^"]+)">/g;
                            while ((match = regex.exec(htmlContent)) !== null) {
                                // match[1]包含匹配的內容，即 id 的後綴
                                products.push(match[1]);
                            }

                            responseArr.push({
                                "coupon" : i,
                                "name" : name,
                                "productCode" : code,
                                "expireDate" : expFull,
                                "products" : products
                            });

                        } catch (error) {
                            // Error handling
                            console.error('Error:', error.message);
                            return NextResponse.json(error.message,{
                                status : 504
                            });
                        }
                    }
                }
            }
        // If coupon doesn't exist
        } catch (err) {
            return NextResponse.json('Does not exist',{
                status : 404
            });
        }
    }

    return NextResponse.json(responseArr);
}