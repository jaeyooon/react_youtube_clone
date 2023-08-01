import React, {useState} from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd'
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { useSelector } from 'react-redux';


const { TextArea } = Input;
const { Title } = Typography;

// option을 위한 key와 value
const PrivateOptions = [    // array로! 그안에는 object로
    {value: 0, label: "Private"},
    {value: 1, label: "Public"}
]

const CategoryOptions = [
    {value: 0, label: "Film & Animation"},
    {value: 1, label: "Autos & Vehicles"},
    {value: 2, label: "Music"},
    {value: 3, label: "Pets & Animals"}
]

function VideoUploadPage(props) {
    const user = useSelector(state => state.user);  // redux의 state로 가서 user 정보를 가져오라는 의미, user의 모든 정보들이 user 변수에 다 담김
    // value들을 state에 넣어놓고 server에 보낼 때 state에 있는 것들을 한꺼번에 보낼 수 있음.
    const [VideoTitle, setVideoTitle] = useState("") 
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)   // private로 하고싶으면 0, public으로 하고싶으면 1로 할 수 있도록
    const [Category, setCategory] = useState("Film & Animation")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState("")

    const onTitleChange = (e) => {  // e는 event를 뜻함
        setVideoTitle(e.currentTarget.value)    // State을 바꿔줄때는 setVideoTitle을 이용
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }

    const onDrop = (files) => {
        
        let formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])   // files의 정보 중 첫 번째 정보를 가져오기 위해 array로

        console.log(files) // files 파라미터에는 파일 정보들이 담겨있음

        // 서버에 request를 보낼 때 Axios 이용 (jquery의 경우 Ajax 사용하듯)
        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => { // 서버에서 작업 처리하고 그거에 대한 response를 가져옴
                if(response.data.success) { // 만약 response가 성공적이라면 
                    console.log(response.data)

                    let variable = {
                        url: response.data.url,
                        fileName: response.data.fileName
                    }

                    setFilePath(response.data.url)

                    Axios.post('/api/video/thumbnail', variable)    //  서버에 보내줌
                    .then(response => { // 서버에서 작업 처리하고 그거에 대한 response를 가져옴
                        if(response.data.success) {
                            console.log(response.data)

                            setDuration(response.data.fileDuration)
                            setThumbnailPath(response.data.thumbsFilePath)

                        } else {
                            alert('썸네일 생성에 실패하였습니다.')
                        }
                    })
                } else {
                    console.log(response.data)
                    alert('비디오 업로드를 실패하였습니다.')
                }
            })
    }

    const onSubmit = (e) => {
        e.preventDefault(); 

        const variables = {     // MongoDB의 Video Collection에 넣어줘야 하므로
            writer: user.userData._id,   // redux에서 user 데이터를 이미 갖고 있으므로 userId를 redux 통해 가져오면 됨(redux hook 사용)
            title: VideoTitle,  // state에서 관리하고 있는 VideoTitle
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath,
        }

        Axios.post('/api/video/uploadVideo', variables) // 위 variables 를 가지고 request를 보냄
            .then(response => { // request에 대한 respond
                if(response.data.success) {
                    
                    message.success('성공적으로 업로드를 했습니다.')

                    setTimeout(() => {  // 성공했을 경우, 3초 후에
                        props.history.push('/')    // 시작페이지로 이동하도록
                    }, 3000);    
                                
                } else {
                    alert('비디오 업로드에 실패하였습니다.')
                }
            })

    }

    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto' }}>
                <div style={{ textAlign:'center', marginBottom:'2rem' }}>
                    <Title level={2}>Upload Video</Title>
                </div>

                <Form onSubmit={onSubmit}>
                    <div style={{ display:'flex', justifyContent:'space-between' }}>
                            {/* Drop zone */}

                            <Dropzone
                            onDrop={onDrop}
                            multiple={false}
                            maxSize={1000000000}
                            >
                            {({ getRootProps, getInputProps }) => (
                                <div style={{ width:'300px', height:'240px', border:'1px solid lightgray', display:'flex',
                                alignItems:'center', justifyContent:'center' }} {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <Icon type="plus" style={{ fontSize:'3rem' }}/>
                                </div>
                            )}  
                            </Dropzone>

                            {/* Thumnail */}

                            {ThumbnailPath &&
                                <div>
                                    <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />
                                </div>
                            }
                    </div>

                    <br/>
                    <br/>
                    <label>Title</label>
                    <Input 
                        onChange={onTitleChange}
                        value={VideoTitle}
                    />
                    <br/>
                    <br/>
                    <label>Description</label>
                    <TextArea 
                        onChange={onDescriptionChange}
                        value={Description}
                    />
                    <br/>
                    <br/>

                    <select onChange={onPrivateChange}>
                        {PrivateOptions.map((item, index) => (
                            <option key={index} value={item.value}>{item.label}</option>
                        ))} 
                    </select>
                    <br/>
                    <br/>
                    <select onChange={onCategoryChange}>
                        {CategoryOptions.map((item, index) => (
                            <option key={index} value={item.value}>{item.label}</option>
                        ))}
                    </select>
                    <br/>
                    <br/>
                    <Button type="primary" size="large" onClick={onSubmit}>
                        Submit
                    </Button>

                </Form>
            
        </div>      // functional component
    )
}

export default VideoUploadPage      // 위 컴포넌트를 다른 파일에서도 이용할 수 있도록(외부에서 쓸 수 있도록)