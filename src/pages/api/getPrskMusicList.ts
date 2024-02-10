import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

// lib
import { ConsoleError } from '@/lib/logging'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  const api_url = `${process.env.BASE_APIURL}${process.env.PRSK_MUSIC}`

  try {

    // for develop
    if(process.env.NODE_ENV === 'development') {
      const fs = require('fs')
      const path = require('path')
      
      const filePath = path.join(process.cwd(), 'doc/music-json/music.json')
      const jsonData = fs.readFileSync(filePath, 'utf-8')
      const data = JSON.parse(jsonData)

      res.status(200).json(data)
    }

    const response = await axios.get(api_url)
    const result = response.data

    res.status(200).json(result)

  } catch(err) {

    ConsoleError(err)
    res.status(500).json("Server Error")
  }
}
export default handler