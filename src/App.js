import React, { useState, useEffect } from 'react'
import { Layout, Button, List } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import './App.css';
import Quote from './Quote'
import Swiper from './Swiper'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const config = {
  apiUrl: 'https://type.fit/api/quotes'
}

function App() {



  const [quotes, setQuotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  // To call the API to receive all the quotes 
  useEffect(() => {
    getQuotes();
    return;
  }, [])

  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  
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
      <Swiper qts = {quotes} />
      <div className = "main-heading">Inspire-ON</div>
      <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup row aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
      </RadioGroup>
      </FormControl>
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
