import React, { useState, useEffect } from 'react'
import { Layout, List } from 'antd'
import './All.css';
import Quote from './Quote'

const config = {
  apiUrl: 'https://type.fit/api/quotes'
}

function All() {



  const [quotes, setQuotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  // To call the API to receive all the quotes 
  useEffect(() => {
    getQuotes();
    return;
  }, [])
  
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
      <Layout>
      <div className="container">
        <List
          size="small"
          loading={isLoading}
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

export default All;
