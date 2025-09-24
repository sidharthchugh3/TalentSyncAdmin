import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../store/hook/hook";
import { useSelector, useDispatch } from "react-redux";
import { createRecruiterProfile } from "../../store/slices/recruiterSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import RecruiterOnboardingForm from "../../components/ui/RecruiterOnboardingForm";

const RecruiterProfileSchema = z.object({
    jobTitle: z.string().min(2, "Job title is required"),
    workEmail: z.string().email("Enter a valid work email"),
    linkedIn: z.string().url("Must be a valid LinkedIn URL").optional(),
    department: z.string().optional(),
    recruitmentType: z.enum(["occasional", "mass", "regular"], {
        message: "Select recruitment type",
    }),
    interviewMode: z.enum(["online", "offline", "hybrid"], {
        message: "Select interview mode",
    }),
    idCardUrl: z.string().url("Must be a valid URL").optional(),
});

const RecruiterOnboarding = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const { rprofile } = useSelector((state) => state.recruiter);
    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: zodResolver(RecruiterProfileSchema), });
    const onSubmit = async (data) => {
        try {
            setLoading(true);
            dispatch(createRecruiterProfile(data)).unwrap();
            navigate("/recruiter/company");
            toast.success("Deployed SuccessFully");
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 shadow-sm max-w-full sm:max-w-2xl lg:max-w-4xl mx-auto mt-10 sm:mt-16 lg:mt-24 mb-8">
                <RecruiterOnboardingForm
                    register={register}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default RecruiterOnboarding;
