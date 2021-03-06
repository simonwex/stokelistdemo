import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { FloatRight, DisabledOverlay, GridLayout } from '../shared/Layouts'
import { getDateRangeString } from '../../util/datetime'

const PostDetail = styled.div`
    font-weight: bold;
    display: flex;
    margin-bottom: 10px;
`

const PostImageContainer = styled.div`
    min-width: 160px;
    min-height: 120px;
    box-sizing: border-box;
    margin-right: 20px;
    background-color: lightgrey;
`

const PostDetailsContainer = styled.div`
    flex-grow: 1;
    box-sizing: border-box;
`

const PostTextSummary = styled.div`
    margin-top: 15px;
    max-height: 40px;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 0.7em;
`

const PostSummaryContainer = styled.div`
    display: flex;
    margin: 10px 0;
    grid-area: 1 / 1;
`

//Generates a full width summary for a post, can be disabled
function PostSummary({ post, disabled }) {
    const imgURL = post.photoFileSize
        ? 'http://list.thestoke.ca/photos/' + post.id + '/thumb.jpg'
        : 'http://list.thestoke.ca/images/placeholder.png'

    const createMarkup = (sanitizedHTML) => {
        return { __html: sanitizedHTML }
    }

    const isGarageSale = (post.isGarageSale === true)

    return (
        <GridLayout>
            {disabled ? <DisabledOverlay /> : null}
            <PostSummaryContainer>
                <PostImageContainer>
                    <Link to={`/post/${post.id}`}>
                        <img src={imgURL} alt={'thumbnail'} />
                    </Link>
                </PostImageContainer>
                <PostDetailsContainer>
                    <FloatRight>{post.location}</FloatRight>
                    <PostDetail>
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </PostDetail>
                    <PostDetail>{isGarageSale ? getDateRangeString(post.startTime,post.endTime) : post.price}</PostDetail>
                    <PostTextSummary
                        dangerouslySetInnerHTML={createMarkup(post.description)}
                    />
                </PostDetailsContainer>
            </PostSummaryContainer>
        </GridLayout>
    )
}

export default PostSummary
