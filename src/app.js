import express from "express";
import routes from './routes/index'
import i18n from './language/languageConfig'
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors())

app.use(i18n.init)

app.use(routes)

const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server started on port ${PORT}`))

export default app
