import DevConfig from './devconfig'
import ProdConfig from './prodconfig'

var Config

if (process.env.NODE_ENV !== 'production') {
  Config = DevConfig
} else {
  Config = ProdConfig
}

export default Config
