import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

export function WovenImageList() {
    const [open, setOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);

    const handleClickOpen = (img) => {
        setSelectedImage(img);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <ImageList sx={{ width: 500, height: 450 }} variant="woven" cols={3} gap={8}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img} onClick={() => handleClickOpen(item.img)}>
                        <img
                            srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.img}?w=161&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                            style={{ cursor: 'pointer' }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>

            <Dialog open={open} onClose={handleClose} maxWidth="lg">
                <DialogContent>
                    {selectedImage && (
                        <img
                            src={selectedImage}
                            alt="Expanded"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

const itemData = [
    { img: '/roomimages/bathroom.jpg', title: 'Bed' },
    { img: '/roomimages/room2.jpg', title: 'Sink' },
    { img: '/roomimages/room3.jpg', title: 'Books' },
    { img: '/roomimages/kitchen.jpg', title: 'Chairs' },
    { img: '/roomimages/kitchen2.jpg', title: 'Candle' },
    { img: '/roomimages/livingroom.jpg', title: 'Laptop' },
    { img: '/roomimages/room4.jpg', title: 'Doors' },
    { img: '/roomimages/livingroom2.jpg', title: 'Coffee' },
    { img: '/roomimages/livingroom3.jpg', title: 'Storage' },
    { img: '/roomimages/building.jpg', title: 'Coffee table' },
    { img: '/roomimages/view.jpg', title: 'Blinds' },
];
