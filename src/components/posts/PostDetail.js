import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Header from "../shared/Header";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const PostReply = styled.div`
    float:right;
`;

const ReplyButton = styled.button`
    border-radius:5px;
    background-color:white;
    border: solid grey 2px;
    padding:8px;
    font-weight:bold;
    color:grey;
    text-align:center;
    margin: 0 auto;
    display: block;
`;

const PostTitle = styled.div`
    font-weight: bold;
    font-size:1.2em
    margin: 5px 0px;
`;

const PostPrice = styled.div`
    font-weight: normal;
    font-size:1em;
    margin: 5px 0px;
`;

const CopyLink =  styled.div`
    font-weight: normal;
    font-size:0.9em;
    text-decoration:underline;
    color: grey;
    margin: 10px auto;
`;
const PostLocation = styled.div`
    font-weight: normal;
    font-size:0.9em;
    margin: 5px 0px;
`;

const PostContainer = styled.div`
    margin: 2% 6%
`;

const PostText = styled.div`
    font-size:0.8em
    margin: 5px 0px;
`;

const PostDateTime = styled.div`
    font-size:0.7em;
    font-weight:bold;
    margin: 5px 0px;
`;

const PostImg = styled.img`
    max-height:400px;
    margin: 5px 0px;
`;

function PostDetail({ match }) {

    const postID = match.params.id;
    //eslint-disable-next-line
    const [postDetails, setPostDetails] = useState(null)

    useEffect(() => {
        console.log("Loading post details")
        fetch(`https://stokelistapi.herokuapp.com/posts/${postID}`)
        .then((response) => {
            return response.json();
        })
        .then((post) => {
            setPostDetails(post) 
        });
    }, [setPostDetails, postID])

    const imgURL = "http://list.thestoke.ca/photos/"+postID+"/original.jpg";
    
    const createMarkup = sanitizedHTML => { return {__html: sanitizedHTML} }

    const replyToPost = () => {window.location.href = `mailto:list-${postID}@thestoke.ca`;}

    return (<div>
        <Header />
        <PostContainer>
            {postDetails === null ? 
                <div>Loading...</div>
            :
                <div>
                    <PostReply>
                        <ReplyButton onClick={replyToPost}>Reply to Post</ReplyButton>
                        <CopyToClipboard text={`list-${postID}@thestoke.ca`}>
                            <CopyLink>Copy Email Address</CopyLink>
                        </CopyToClipboard>
                    </PostReply>
                    <PostTitle>{postDetails.title}</PostTitle>
                    <PostPrice>{postDetails.price}</PostPrice>
                    <PostLocation>{postDetails.location}</PostLocation>
                    {postDetails.photoFileSize !== null ? <PostImg src={imgURL} alt="Post"/> : null}
                    <PostText dangerouslySetInnerHTML={createMarkup(postDetails.description)} />
                    <PostDateTime>{postDetails.created_at}</PostDateTime>
                </div>
            }
            
        </PostContainer>
    </div>)
}

export default PostDetail