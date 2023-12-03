"use client"
import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 設定Cookie
        const cookies = {
          "__lt__cid": "10492ac2-11cc-42ff-9d17-d74232c5e33c",
          "__lt__sid": "2eea4326-485b06ea",
          "_atrk_sessidx": "10",
          "_atrk_siteuid": "cSxN1bC35wr11548",
          // 其他Cookie...
        };

        // 將Cookie轉換為字串
        const cookieString = Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ');

        // 發送GET請求，附帶Cookie
        const response = await fetch('/api/meal/TA4165', {
          method: 'GET',
          headers: {
            'Cookie': cookieString,
            // 其他可能需要的標頭...
          },
        });

        // 檢查HTTP狀態碼
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // 解析JSON格式的回應
        const result = await response.json();
        
        // 設定資料狀態
        setData(result);
        setLoading(false);
      } catch (error) {
        // 設定錯誤狀態
        setError(error);
        setLoading(false);
      }
    };

    // 執行fetchData函數
    fetchData();
  }, []); // 注意：這裡的空陣列表示僅在組件掛載時執行一次

  // 根據狀態顯示內容
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {/* 根據需要顯示資料 */}
      {data && (
        <div>
          {/* 處理資料的方式，根據實際需要進行修改 */}
          <p>Data: {JSON.stringify(data)}</p>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
