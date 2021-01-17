<?php
	function phpAlert($msg) {
    echo '<script type="text/javascript">alert("' . $msg . '")</script>';
	}
	if(isset($_POST['submit'])){
		$name=$_POST['sndname'];
		$email=$_POST['sndemail'];
		$msg=$_POST['sndmsg'];

		$to='dev.soumallya@gmail.com'; // Receiver Email ID, Replace with your email ID
		$subject='Form Submission';
		$message="Name :".$name."\n"."Phone :".$phone."\n"."Wrote the following :"."\n\n".$msg;
		$headers="From: ".$email;

		if(mail($to, $subject, $message, $headers)){
			phpAlert(   "We will contact you shortly!"   );
		}
		else{
			phpAlert(   "Something went wrong!"   );
		}
	}
?>