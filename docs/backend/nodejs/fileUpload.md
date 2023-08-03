# 文件上传

## 一. 安装
```shell
npm i express multer --save
```
## 二. `Multer`实现文件上传
```javascript
const express = require("express")
const multer = require("multer")
const cors = require('cors')

const app = express()
app.use(cors())

function fileFilter(req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(new Error('只能上传 PNG 或 JPG 图片文件'));
    }
}

const storage = multer.diskStorage({
    // 上传文件目录
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    // 文件名
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage, fileFilter })

app.post('/file', upload.single('file'), function (req, res, next) {
  res.send('ok')
})

app.post("/files", upload.array("files", 4), function (req, res) {
  res.send("ok")
})

app.listen(3000, () => {
    console.log("express server running at http://127.0.0.1")
})
```
## 三. 前端
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- 单文件上传 -->
    <input type="file" id="file">
    <!-- 多文件上传 -->
    <input type="file" id="files" multiple>
    <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.26.0/axios.min.js"></script>
    <script>
        const file = document.getElementById('file')
        const files = document.getElementById('files')
        axios.defaults.baseURL = 'http://127.0.0.1:3000'
        // 单文件上传
        file.addEventListener('change', async (e) => {
            const formData = new FormData()
            formData.append("file", e.target.files[0])
            const res = await axios.post("/file", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        })
        // 多文件上传
        files.addEventListener('change', async (e) => {
            const formData = new FormData()
            const files = e.target.files
            for (let i = 0; i < files.length; i ++ ) {
                formData.append('files', files[i])
            }
            const res = await axios.post("/files", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        })
    </script>
</body>
</html>
```