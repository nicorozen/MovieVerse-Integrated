import React, { useState, useEffect } from 'react';
import MovieItem from './MovieItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import LoadingSkeleton from '../Layout/LoadingSkeleton';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function ListCatalogItem({ item, contentType }) {
  const [loading, setLoading] = useState(true);

    return (
        <MovieItem key={item.listItemId} item={item} contentType={contentType} />
    );
  
}

export default ListCatalogItem;

