import React, { useState, useEffect } from 'react'
import { Layout, Button, List } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import './App.css';
import Quote from './Quote'
import Swiper from './Swiper'
import All from './All'
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
  const [value, setValue] = React.useState('Swiper quotes');
  const [showw, changeShoww] = useState('<All />')
  let showing = <All />

  // To call the API to receive all the quotes 
  useEffect(() => {
    getQuotes();
    if(value === 'Swiper quotes') {
      changeShoww('<Swiper qts = quotes />')
    } else {
      showing = <All />
    }
    return;
  }, [value])

  const swpr = <Swiper qts = {quotes} />
  const all = <All />

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
      <div className = "main-heading">Inspire-ON</div>
      <FormControl component="fieldset">
      <FormLabel component="legend">Choose the preferred theme</FormLabel>
      <RadioGroup row aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="Swiper quotes" control={<Radio />} label="Swiper quotes" />
        <FormControlLabel value="All in one quotes" control={<Radio />} label="All in one quotes" />
        {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
        {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
      </RadioGroup>
      </FormControl>
      {/* <Layout> */}
      {/* <div className="container">
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
      </div> */}
      <div>

      {
        value == "Swiper quotes" &&  swpr
      }
      {
        value == "All in one quotes" &&  all
      }


      {/* <All /> */}
      {/* <Swiper qts = {quotes} /> */}
      </div>
    {/* </Layout> */}
    </div>
  );
}

export default App;
