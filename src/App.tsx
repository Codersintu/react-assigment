import { useForm } from 'react-hook-form';
import './App.css'
import { Loader } from 'lucide-react';
import { useState } from 'react';

function App() {
const {register,handleSubmit,formState:{errors,isSubmitting},reset}=useForm()
const [order,setorder]=useState([]);

const onSubmit=async(data:any)=>{
   await new Promise((res)=>setTimeout(res, 1000))
   setorder((prev):any=>[...prev,data]);
   reset()
 }

  return (
     <div className="w-full min-h-screen flex items-center justify-center bg-[#061a2b]">
      <div className="w-full max-w-7xl min-h-screen bg-linear-to-r from-[#061a2b] via-[#082338] to-[#0b2f4a] flex flex-col items-center justify-center mt-10">
        <div className="w-full max-w-2xl rounded-2xl flex flex-col p-10 shadow-2xl bg-linear-to-r from-[#2D3844] via-[#62240C] to-[#62240C] gap-8">
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8'>
            <h1 className='text-2xl text-center text-white font-bold'>Create Order</h1>
            <div className="flex flex-col">
            <label className='py-2 px-5 bg-gray-300 rounded-2xl w-full'>
            <input type="text" className='outline-none w-full' placeholder='Customer name ...' {...register("name",{required:"name is required"})}/>
            </label>
            {errors.name && (
              <p className="text-red-500">
                  {errors.name?.message as string}
              </p>
           )}
           </div>
             <div className="flex flex-col">
            <label className='py-2 px-5 bg-gray-300 rounded-2xl'>
            <input type="number" {...register("number",{required:"number is required"})} className='outline-none w-full' placeholder='+91' />
            </label>
            {errors.number && (
              <p className="text-red-500">
                  {errors.number?.message as string}
              </p>
           )}
            </div>
             
             <div className="flex flex-col">
            <label className='py-2 px-5 bg-gray-300 rounded-2xl'>
            <textarea {...register("address",{required:"address is required"})} className='outline-none w-full' id="" placeholder='address...'></textarea>
            </label>
            {errors.address && (
              <p className="text-red-500">
                  {errors.address?.message as string}
              </p>
           )}
            </div>
        
        {/* service type input */}
        <div className="flex flex-col">
        <label className="py-2 bg-gray-300 rounded-2xl px-2">
          <select
          {...register("service",{required:"select service type"})}
            defaultValue=""
            className="px-4 bg-transparent outline-none cursor-pointer w-full"
          >
            <option value="" disabled>
              Service Type
            </option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </label>
        {errors.service && (
          <p className="text-red-500">
                  {errors.service?.message as string}
              </p>
        )}
        </div>

{/* pickup slot input */}
<div className="flex flex-col">
  <label className="flex flex-col gap-1">
  <select
  {...register("slot",{required:"Select pickup slot"})}
    defaultValue=""
    className="px-4 py-2 bg-gray-200 rounded-xl outline-none cursor-pointer w-full"
  >
    <option value="" disabled>
      Select pickup slot
    </option>
    <option value="today_evening">Today Evening</option>
    <option value="tomorrow_morning">Tomorrow Morning</option>
    <option value="tomorrow_afternoon">Tomorrow Afternoon</option>
    <option value="tomorrow_evening">Tomorrow Evening</option>
  </select>
</label>
     {errors.slot && (
          <p className="text-red-500">
                  {errors.slot?.message as string}
              </p>
        )}
</div>
        {/* submit btn */}
        {isSubmitting ? <div className="w-full flex items-center justify-center"><Loader className='animate-spin w-12 h-12 text-white'/></div> :
        <button className='bg-blue-800 py-2 rounded-2xl text-white font-semibold cursor-pointer'>Create Order</button>
        }

        </form>
        </div>
       <OrdersTable orders={order}/>
      </div>
     </div>
  )
}

export default App




const OrdersTable = ({ orders }:any) => {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border border-gray-300 rounded-xl overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Customer Name</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Address</th>
            <th className="px-4 py-2 text-left">Service Type</th>
            <th className="px-4 py-2 text-left">Pickup Slot</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td
                
                className="text-center py-4 text-gray-500"
              >
                No orders yet
              </td>
            </tr>
          ) : (
            orders.map((order:any, index:any) => (
              <tr key={index} className="border-t text-white">
                <td className="px-4 py-2">{order.name}</td>
                <td className="px-4 py-2">{order.number}</td>
                <td className="px-4 py-2">{order.address}</td>
                <td className="px-4 py-2">{order.service}</td>
                <td className="px-4 py-2">{order.slot}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
