import type { FC } from 'hono/jsx';
import { useState } from 'hono/jsx';

const Layout: FC = (props) => {
  return (
    <html>
      <title>Portkey AI Login</title>
      <body>{props.children}</body>
    </html>
  )
}

export const Login: FC<{ messages: string[] }> = (props: {
  messages: string[]
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const onSubmit = () => {
    console.log('submitting form')
    console.log(email, password)
  }
  return (
    <Layout>
      <h1>Hello Hono!</h1>
      <div>
        <span>邮箱:</span>
        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <span>密码:</span>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <input type="submit" onSubmit={onSubmit} />
      </div>
    </Layout>
  )
}
