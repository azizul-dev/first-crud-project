"use client";
import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";

const BookingDelete = ({ bookingId }) => {

  

  const handleCancelBooking = async() =>{


    const {data:tokenData} = await authClient.token()


    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${bookingId}`,{
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${tokenData?.token}`
      }
    })
    const data = await res.json();

    window.location.reload();
  }
  return (
    <AlertDialog>
      {/* ✅ Trigger */}
      <AlertDialog.Trigger>
        <Button type="button" className={'cursor-pointer'} color="danger" variant="solid">
          Cancel
        </Button>
      </AlertDialog.Trigger>

      {/* ✅ Backdrop */}
      <AlertDialog.Backdrop>
        {/* ✅ FIX: center করার জন্য */}
        <AlertDialog.Container className="fixed inset-0 flex items-center justify-center">
          <AlertDialog.Dialog className="sm:max-w-[400px] bg-white p-4 rounded-lg">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete project permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>My Awesome Project</strong>{" "}
                and all of its data.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="light">
                Cancel
              </Button>

              <Button onClick={handleCancelBooking} className={'cursor-pointer'} slot="close" color="danger">
                Delete Project
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default BookingDelete;
