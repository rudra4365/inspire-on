import React, { useState } from 'react'
import { Layout, Button, List } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import './App.css';
import Quote from './Quote'

const config = {
  apiUrl: 'https://type.fit/api/quotes'
}

function App() {

  const [quotes, setQuotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  const getQuotes = () => {
    setQuotes([])
    setIsLoading(true)
    fetch(config.apiUrl)
      .then(function (response) {
        return response.json()
      })
      .then((data) => {
        setQuotes(data)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="App">
      <div className = "main-heading">Inspire-ON</div>
      <Layout>
      <div className="container">
        <List
          size="small"
          loading={isLoading}
          header={
            <button
              onClick={() => getQuotes()}
              type="primary"
              icon={<DownloadOutlined />}
              disabled={isLoading || quotes.length}
              size="large">
              Fetch Quotes
            </button>
          }
          bordered
          dataSource={quotes}
          renderItem={(quote) => (
            <List.Item>
              <Quote text={quote.text} author={quote.author} />
            </List.Item>
          )}
        />
      </div>
    </Layout>
    </div>
  );
}

export default App;
