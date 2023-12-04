import puppeteer from 'puppeteer';

export const GET = async (req, { params }) => {

  const {mealId} = params

  const browser = await puppeteer.launch({
    headless: "new"
  });
  const page = await browser.newPage();
    
  // Step 1: 進入網頁
  // await page.goto('https://www.kfcclub.com.tw/meal/TA4165');

  // Step 2: 點擊加入餐車按鈕
  // await page.waitForSelector('#btnAddToCart');
  // await page.click('#btnAddToCart');

  // Step 3: 選擇第一項有value值的option
  // await page.waitForSelector('#pop-Lct_selTakeOutAddr1');
  // await page.select('#pop-Lct_selTakeOutAddr1', '基隆市');

  // Step 4: 選擇第一項有value值的option
  // await page.waitForSelector('#pop-Lct_selTakeOutAddr2');
  // await page.select('#pop-Lct_selTakeOutAddr2', '仁愛區');

  // Step 5: 模擬點擊第一項div.restaurant
  // await page.click('#pop-Lct_TakeOutShop .restaurant');

  // Step 6: 螢幕截圖
  // await page.waitForTimeout(2000);
  // await page.screenshot({ path: 'screenshot.png' });

  // await browser.close();

  try {
    // Define the URL and headers for the fetch request
    const url = `https://www.kfcclub.com.tw/meal/${mealId}`;
    
    
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



// 請幫我使用NextJS puppeteer按照順序完成以下需求：

// 1. 進入https://www.kfcclub.com.tw/meal/TA4180網頁

// 2. 點擊頁面上的<button type="button" class="btn block ShowOrderShop" onclick="MealAddToCart()" id="btnAddToCart"><span>加入餐車</span></button>

// 3. 在頁面上的
// <select id="pop-Lct_selTakeOutAddr1"><option value="">請選擇</option><option value="基隆市">基隆市</option><option value="台北市">台北市</option><option value="新北市">新北市</option><option value="桃園市">桃園市</option><option value="新竹市">新竹市</option><option value="苗栗縣">苗栗縣</option><option value="新竹縣">新竹縣</option><option value="台中市">台中市</option><option value="彰化縣">彰化縣</option><option value="南投縣">南投縣</option><option value="雲林縣">雲林縣</option><option value="嘉義市">嘉義市</option><option value="嘉義縣">嘉義縣</option><option value="台南市">台南市</option><option value="高雄市">高雄市</option><option value="屏東縣">屏東縣</option><option value="宜蘭縣">宜蘭縣</option><option value="花蓮縣">花蓮縣</option><option value="台東縣">台東縣</option></select>

// 母元素<select id="pop-Lct_selTakeOutAddr1">中，
// 選擇第一項有value值的選項。
// 以上方程式碼為例則選擇
// <option value="基隆市">基隆市</option>
// （因為這是第一項有value值的option）


// 4. 在頁面上的
// <select id="pop-Lct_selTakeOutAddr2"><option value="">請選擇</option><option value="仁愛區">仁愛區</option></select>


// 母元素<select id="pop-Lct_selTakeOutAddr2">中，
// 選擇第一項有value值的選項。
// 以上方程式碼為例則選擇
// <option value="仁愛區">仁愛區</option>
// （因為這是第一項有value值的option）


// 5.在頁面上的
// <div id="pop-Lct_TakeOutShop" class="panel panel_tab1_store2" style="display: block;"><div name="pop-Lct_ShopButton" class="restaurant" c="TWB537" shop-info="{&quot;ShopCode&quot;:&quot;TWB537&quot;,&quot;Addr1&quot;:&quot;基隆市&quot;,&quot;Addr2&quot;:&quot;仁愛區&quot;}" onclick="L_TakeOutShopClick(this);" md="n"><div class="restaurant_radio"><input type="radio"></div><div class="restaurant_store"><p name="pop-Lct_SB_ShopName">基隆忠二餐廳 (基隆港海洋廣場前)</p><ul><li name="pop-Lct_SB_ShopAddr">基隆市仁愛區忠二路13號</li><li>週一-週五10:00-23:00、 週六-週日09:00-23:00</li></ul></div></div><div name="pop-Lct_ShopButton" class="restaurant" c="TWI086" shop-info="{&quot;ShopCode&quot;:&quot;TWI086&quot;,&quot;Addr1&quot;:&quot;基隆市&quot;,&quot;Addr2&quot;:&quot;仁愛區&quot;}" onclick="L_TakeOutShopClick(this);" md="n"><div class="restaurant_radio"><input type="radio"></div><div class="restaurant_store"><p name="pop-Lct_SB_ShopName">基隆仁一餐廳 (田遼河銀蛇橋前)</p><ul><li name="pop-Lct_SB_ShopAddr">基隆市仁愛區劉銘傳路1號</li><li>週日-週四08:00-23:00、週五-週六08:00-24:00</li><li>早餐供應</li></ul></div></div></div>

// 母元素<div id="pop-Lct_TakeOutShop" class="panel panel_tab1_store2" style="display: block;">
// 模擬滑鼠點擊(click)第一項div.restaurant的子元素。
// 以上方程式碼為例則點擊
// <div name="pop-Lct_ShopButton" class="restaurant" c="TWB537" shop-info="{&quot;ShopCode&quot;:&quot;TWB537&quot;,&quot;Addr1&quot;:&quot;基隆市&quot;,&quot;Addr2&quot;:&quot;仁愛區&quot;}" onclick="L_TakeOutShopClick(this);" md="n"><div class="restaurant_radio"><input type="radio"></div><div class="restaurant_store"><p name="pop-Lct_SB_ShopName">基隆忠二餐廳 (基隆港海洋廣場前)</p><ul><li name="pop-Lct_SB_ShopAddr">基隆市仁愛區忠二路13號</li><li>週一-週五10:00-23:00、 週六-週日09:00-23:00</li></ul></div></div>
// （因為這是第一項div.restaurant子元素）


// 6. 螢幕截圖

// 7. 將截圖存到NextJS專案資料夾根目錄
