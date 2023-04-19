import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { ReactComponent as Airbnb } from './assets/airbnb.svg'
import { ReactComponent as Ally} from './assets/ally.svg'
import { ReactComponent as Amazon} from './assets/amazon.svg'
import { ReactComponent as Azure} from './assets/azure.svg'
import { ReactComponent as Calendar} from './assets/calendar.svg'
import { ReactComponent as Chase} from './assets/chase.svg'
import { ReactComponent as Citi} from './assets/citi.svg'
import { ReactComponent as Costco} from './assets/costco.svg'
//import { ReactComponent as Craigslist} from './assets/craigslist.svg'
import { ReactComponent as Ebay} from './assets/ebay.svg'
import { ReactComponent as Drive} from './assets/drive.svg'
import { ReactComponent as Gmail} from './assets/gmail.svg'
import { ReactComponent as GitHub} from './assets/github.svg'
import { ReactComponent as Homedepot} from './assets/homedepot.svg'
import { ReactComponent as Hulu} from './assets/hulu.svg'
import { ReactComponent as Maps} from './assets/maps.svg'
//import { ReactComponent as Microsoft} from './assets/microsoft.svg'
import { ReactComponent as Netflix} from './assets/netflix.svg'
//import { ReactComponent as Outlook} from './assets/outlook.svg'
import { ReactComponent as PayPal} from './assets/paypal.svg'
//import { ReactComponent as Principal} from './assets/principal.svg'
import { ReactComponent as Robinhood} from './assets/robinhood.svg'
//import { ReactComponent as Suntrust} from './assets/suntrust.svg'
//import { ReactComponent as Walmart} from './assets/walmart.svg'
import { ReactComponent as Whatsapp} from './assets/whatsapp.svg'
import { ReactComponent as Youtube} from './assets/youtube.svg'

const LinkItem = ({ children, url, asis }) => (
  <Grid item xs={6} md={4} lg={3}>
    <a href={`${url || 'https://crespoapps.github.io/'}${asis ? '' : '?utm_source=crespo+apps&utm_medium=website&utm_campaign=crespoapps=&utm_term=free&utm_content=link'}`}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 80,
        }}
      >
        {children}
      </Paper>
    </a>
  </Grid>
)

const Links = () => (
    <Grid container spacing={1}>

      <LinkItem url="https://mail.google.com/"><Gmail /></LinkItem>
      <LinkItem url="https://calendar.google.com/"><Calendar /></LinkItem>
      <LinkItem url="https://maps.google.com/"><Maps /></LinkItem>
      <LinkItem url="https://drive.google.com/"><Drive /></LinkItem>

      <LinkItem url="https://www.youtube.com/channel/UCVyC2-yL7ZLOL1xqOy2VkXw/"><Youtube /></LinkItem>
      <LinkItem url="https://www.netflix.com/"><Netflix /></LinkItem>
      <LinkItem url="https://www.hulu.com/"><Hulu /></LinkItem>
      <LinkItem url="https://www.airbnb.com/c/fcrespo/"><Airbnb /></LinkItem>
      
      <LinkItem url="https://smile.amazon.com/"><Amazon /></LinkItem>
      <LinkItem url="https://www.costco.com/"><Costco /></LinkItem>
      <LinkItem url="https://www.ebay.com/"><Ebay /></LinkItem>
      <LinkItem url="https://www.homedepot.com/"><Homedepot /></LinkItem>

      <LinkItem url="https://www.ally.com/"><Ally /></LinkItem>
      <LinkItem url="https://www.chase.com/"><Chase /></LinkItem>
      <LinkItem url="https://www.citi.com/"><Citi /></LinkItem>
      <LinkItem url="https://www.paypal.com/"><PayPal /></LinkItem>

      <LinkItem url="https://portal.azure.com/"><Azure /></LinkItem>
      <LinkItem url="https://www.github.com/"><GitHub /></LinkItem>
      <LinkItem url="http://share.robinhood.com/"><Robinhood /></LinkItem>
      <LinkItem url="https://web.whatsapp.com/"><Whatsapp /></LinkItem>

    </Grid>
)

export default Links