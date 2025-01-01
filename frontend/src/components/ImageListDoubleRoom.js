import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

export function WovenImageListDouble() {
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
            {/* Image List */}
            <ImageList sx={{ width: '100%', height: 'auto' }} variant="woven" cols={2} gap={8}>
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

            {/* Dialog for Expanded Image */}
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
    { img: '/roomimages/bathroom.jpg', title: 'Bathroom' },
    { img: '/roomimages/room2.jpg', title: 'Room 2' },
    { img: '/roomimages/room3.jpg', title: 'Room 3' },
    { img: '/roomimages/kitchen.jpg', title: 'Kitchen' },
    { img: '/roomimages/kitchen2.jpg', title: 'Kitchen 2' },
    { img: '/roomimages/livingroom.jpg', title: 'Living Room' },
    { img: '/roomimages/room4.jpg', title: 'Room 4' },
    { img: '/roomimages/livingroom2.jpg', title: 'Living Room 2' },
    { img: '/roomimages/view.jpg', title: 'View' },
];
