export const GET = async (req, { params }) => {

  const {mealId} = params

  try {
    // Define the URL and headers for the fetch request
    const url = `https://www.kfcclub.com.tw/meal/${mealId}`;

    // Define the cookies
    const cookies = {
      'ASP.NET_SessionId': 'a34papdvpdpu5nxphqwznxsa',
      'GCLB': 'CMXsru-sjdPlFQ',
      'OrderTypeCheck': '2',
      // '_td_cid': '2057881384.1697994116',
      // '__lt__cid': '10492ac2-11cc-42ff-9d17-d74232c5e33c',
      // '_atrk_siteuid': 'cSxN1bC35wr11548',
      // '_gac_UA-31383057-8': '1.1701588807.EAIaIQobChMI49qul-DyggMVztZMAh3vogTgEAAYASAAEgKQgfD_BwE',
      // 'olo_localize_ver': '2',
      // 'ab.storage.deviceId.0ffd3aa6-09ff-4668-94bd-417ef196fbc2': '{"g":"77a06221-f0ce-7005-8399-31bd96c59bb0","c":1691564785773,"l":1701587187068}',
      // '_gcl_au': '1.1.1157591665.1697994124',
      // 'kfcclub-com-tw-tw__zc_store': '{"cv":null,"start_at_44886":1701524464194,"duration_44886":1800000,"shown_at":1701588813246,"start_at_44887":1701588734923,"duration_44887":1800000}',
      // 'kfcclub-com-tw-tw__zc': '3.64d33af9fc5ecb00222a1b94.16.0.0.0.',
      // '8b05426c-29f0-48fa-83a4-538e2a298d0d_OSLogCheck': '1',
      // '8b05426c-29f0-48fa-83a4-538e2a298d0d_RunGBFirstCheck': '1',
      // '918522af-e5f7-4a75-8fa1-00ecafdc65c3_OSLogCheck': '1',
      // '918522af-e5f7-4a75-8fa1-00ecafdc65c3_RunGBFirstCheck': '1',
      // '_uetsid': '60ad002090fc11ee8533fb857aa7d836',
      // '_uetvid': '42295250368311eeadc8cfd5f59838d4'
      // '_gcl_aw': 'GCL.1701588017.EAIaIQobChMI6oicnNryggMVvjh7Bx3ZAQNzEAAYASAAEgLxOvD_BwE',
      // '_gid': 'GA1.3.1447289115.1701512407',
      // 'appier_utmz': '{"csr":"(adwords gclid)","timestamp":1701588017,"lcsr":"(adwords gclid)"}',
      // '8fa50820-763a-4e1d-855d-a301ebb84cb9_OSLogCheck': '1',
      // '8fa50820-763a-4e1d-855d-a301ebb84cb9_RunGBFirstCheck': '1',
      // '__lt__sid': '2eea4326-6c365060',
      // '_atrk_ssid': 'Y_CjX8eGGpGnv7F5ygM0ZH',
      // '_atrk_sessidx': '37',
      // 'appier_pv_counteryEztyxxxF2ZbSAk': '21',
      // 'appier_page_isView_yEztyxxxF2ZbSAk': 'e24a10bbfa3f477653b4071808b52e8c2f8006c58f25e75da3bc1dcb20bf6033',
      // 'appier_pv_counter04d0bb9d7439237': '16',
      // 'appier_page_isView_04d0bb9d7439237': 'e24a10bbfa3f477653b4071808b52e8c2f8006c58f25e75da3bc1dcb20bf6033',
      // '_fbp': 'fb.3.1701587188270.1156926431',
      // 'kfcclub-com-tw-tw__zc_us': '656c28f4fdae4b00352bd762.0.19.1701587188700',
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

    // Send a GET request with headers
    const response = await fetch(url, { headers });

    // Check the HTTP status code
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Get the HTML content from the response
    const htmlContent = await response.text();

    // 定義正則表達式來匹配<p class="product-name">中的內容及包含的<a>標籤
    const regex = /<p class="product-name">([^<]+(<a[^>]*>.*?<\/a>)?)<\/p>/g;

    // 使用正則表達式的exec方法來獲取匹配的結果
    let match;
    let result = [];

    while ((match = regex.exec(htmlContent)) !== null) {
      // match[1]包含匹配的內容，即品項名稱，移除<a>標籤
      result.push(match[1].replace(/<a[^>]*>.*?<\/a>/, '').trim());
    }

    // console.log(htmlContent)
    // console.log(result)

    // Return a response with the HTML content
    return new Response(htmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    // Handle errors
    console.error('Error:', error.message);
    return { error: error.message };
  }
};
