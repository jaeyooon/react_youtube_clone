import React, {useState} from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd'
import Dropzone from 'react-dropzone';

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

function VideoUploadPage() {

    // value들을 state에 넣어놓고 server에 보낼 때 state에 있는 것들을 한꺼번에 보낼 수 있음.
    const [VideoTitle, setVideoTitle] = useState("") 
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)   // private로 하고싶으면 0, public으로 하고싶으면 1로 할 수 있도록
    const [Category, setCategory] = useState("Film & Animation")

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

    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto' }}>
                <div style={{ textAlign:'center', marginBottom:'2rem' }}>
                    <Title level={2}>Upload Video</Title>
                </div>

                <Form onSubmit>
                    <div style={{ display:'flex', justifyContent:'space-between' }}>
                            {/* Drop zone */}

                            <Dropzone
                            onDrop
                            multiple
                            maxSize
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
                            <div>
                                <img src alt />
                            </div>
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
                    <Button type="primary" size="large" onClick>
                        Submit
                    </Button>

                </Form>
            
        </div>      // functional component
    )
}

export default VideoUploadPage      // 위 컴포넌트를 다른 파일에서도 이용할 수 있도록(외부에서 쓸 수 있도록)