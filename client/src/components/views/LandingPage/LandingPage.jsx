import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { response } from 'express'
import { useNavigate } from 'react-router-dom';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../../Config';
import { Row } from 'antd';

import MainImage from './Sections/MainImage';
import GridCards from '../../commons/GridCards';



function LandingPage() {

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('api/hello')//서버측으로 주는 엔드포인트, 서버측 index.js에 get라우터 구현
            .then(response => console.log(response.data))
    }, [])

    const onClickHandelr = () => {
        axios.get('/api/users/logout')
            .then(response => {
                if (response.data.success) {
                    navigate('/login')
                } else {
                    //실패
                }
            })
    }

    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null)

    useEffect(() => {
        //인기있는 영화 엔드포인트 지정
        const endPoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=ko-KO&page=1`;

        //fetch로 현재 인기있는 영화 가져오기
        fetch(endPoint)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                //setMovies로 가져온 데이터를 배열에 넣기
                setMovies([...response.results])
                setMainMovieImage(response.results[0])
            })
    }, [])


    return (
        <div style={{ width: '100%', margin: '0' }}>
            <button onClick={onClickHandelr}>로그아웃</button>

            {/* 메인 이미지 */}
            {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.title}
                    text={MainMovieImage.overview}
                />
            }


            <div style={{ width: '85%', margin: '1rem auto' }}>

                <h2>Movies by latest</h2>
                <hr />

                {/* Movie Grid Cards */}


                {Movies && Movies.map((movie, index) => (
                    <React.Fragment key={index}>
                        <GridCards
                            landingPage
                            image={movie.poster_path ?
                                `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                            movieId={movie.id}
                            movieName={movie.original_title}
                        />
                    </React.Fragment>
                ))}


            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button>더 보기</button>
            </div>
        </div>
    )
}

export default LandingPage