import React, { useState, useEffect, useCallback } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAllVideos } from '../api/videos';

export default function PrivateRoute() {
  const { currentUser } = useAuth();

  const [itemData, setItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadItems = useCallback(async () => {
    console.log('loading items');
    const listVideos = await getAllVideos();
    setItemData(listVideos);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    loadItems();
  }, [loadItems]);

  return currentUser ? (
    <Outlet context={[itemData, isLoading]} />
  ) : (
    <Navigate to={'/login'} />
  );
}
