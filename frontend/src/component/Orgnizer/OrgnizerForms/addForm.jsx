import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { tournamentAPI } from "../../../services/api"
import Header from "../../header/header"
import "./addform.css"

function AddForm(){
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            await tournamentAPI.createTournament(formData)
            alert('Tournament created successfully!')
            navigate('/UserHome')
        } catch (error) {
            setError('Failed to create tournament. Please try again.')
            console.error('Error creating tournament:', error)
        } finally {
            setLoading(false)
        }
    }
    return(<>
{/* <Header/> */}
    
    <div className="add_form1"> 
    <br />
    <div class="row">
            <div class="col-md-6 offset-md-3">
                <div class="mb-3">
                    <h3 style={{color:''}}>Add tournaments </h3>
                </div>
                <form onSubmit={handleSubmit} id="form1" className="shadow p-4">
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="name">Tournament Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="name" 
                            id="name" 
                            placeholder="Tournament name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description">Description</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="description" 
                            id="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="startDate">Date of Start</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            name="startDate" 
                            id="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="endDate">Date of End</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            name="endDate" 
                            id="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="butt_10">
                        <button 
                            className="butt_10"  
                            type="submit" 
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'ADD'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
   

    </>)
}
export default AddForm