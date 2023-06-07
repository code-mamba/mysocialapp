import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import './FormDialogue.css'
import {useState} from 'react';
const FormDialogue = ({open,setOpen}) =>{
	const[bio,setBio] = useState('')
	const[name, setName] = useState('')
	const[city, setCity] = useState('')
	const[profilePic, setProfilePic] = useState(null)
	const[coverImg, setCoverImg] = useState(null)
	const[country,setCountry] = useState('')
	const[relationship, setRelationship] = useState('')
	const handleClose = () => {
		setOpen(false);
	  };
const profileImgChange = (e) =>{
		// const files = e.target.files
		// const formData = new FormData()
		// for(let i =0;i<files.length;i++){
		// 	formData.append('files',files[i])
		// }
		setProfilePic(e.target.files[0])

}
const coverImageChange = (e) =>{
	setCoverImg(e.target.files[0])
}
	const handleSubmit = async() =>{
		const formData = new FormData()
		formData.append('name',name)
		formData.append('bio',bio)
		formData.append('city',country);
		formData.append('relationship',relationship)
		formData.append('profilePic',profilePic)
		formData.append('coverImg', coverImg)
		try{
			const userId = sessionStorage.getItem('userId')
			
		}
		catch(err){
			console.log(err)
		}
		
	}
	return(
		<div>
		<Dialog open={open} onClose={handleClose}>
		  <DialogTitle>Edit Your Profile</DialogTitle>
		  <DialogContent className='DialogueContent'>
			<DialogContentText >
			</DialogContentText>
			<div >
				<label><strong>Profile picture</strong></label>
			<input
              className="Input"
              type="file"
              onChange={profileImgChange}
            ></input>
				<label><strong>Cover photo</strong></label>
			<input
              className="Input"
              type="file"
              onChange={coverImageChange}
            ></input>
			<input
              className="Input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Add a name"
            />
			<input
              className="Input"
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Add a short bio to tell people more about yourself."
            />
			<input
              className="Input"
              type="text"
			  value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
			<input
              className="Input"
              type="text"
			  value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
			<input
              className="Input"
              type="text"
			  value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              placeholder="Relationship"
            />
			</div>
		  </DialogContent>
		  <DialogActions>
			<Button onClick={handleClose}>Cancel</Button>
			<Button onClick={handleSubmit}>Submit</Button>
		  </DialogActions>
		</Dialog>
	  </div>
	)
}
export default FormDialogue