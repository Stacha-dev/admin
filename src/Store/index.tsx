import React, { createContext } from 'react';
import { UserService, GalleryService, ImageService } from '../services/Tardis';

interface StoreContextProps {
	userService: UserService;
	galleryService: GalleryService;
	imageService: ImageService;
}

const userService = new UserService();
const galleryService = new GalleryService();
const imageService = new ImageService();

const StoreContext = createContext<StoreContextProps>({
	userService: userService,
	galleryService: galleryService,
	imageService: imageService,
});

const StoreProvider: React.FC<{ children: any }> = ({ children }): JSX.Element => {
	return (
		<StoreContext.Provider
			value={{
				userService,
				galleryService,
				imageService,
			}}>
			{children}
		</StoreContext.Provider>
	);
};

export default StoreContext;
export { StoreProvider };
