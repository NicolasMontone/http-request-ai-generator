import { Footer } from '../Footer'
import { Head } from '../Head'
import { Props } from './Page.types'

const Page = ({ children, title, description, url }: Props) => {
  return (
    <div>
      <Head title={title} description={description} url={url} />
      {children}
      <Footer />
    </div>
  )
}

export default Page
