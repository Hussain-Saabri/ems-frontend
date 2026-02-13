import apiClient from '@/api/apiClient';

const employeeService = {
    /**
     * Get all employees with optional search
     */
    getEmployees: async (search = '') => {
        const response = await apiClient.get('/employees', {
            params: { search }
        });
        return response.data.data;
    },

    /**
     * Get employee by ID
     */
    getEmployeeById: async (id) => {
        const response = await apiClient.get(`/employees/${id}`);
        return response.data.data;
    },

    /**
     * Create a new employee
     */
    createEmployee: async (employeeData) => {
        const response = await apiClient.post('/employees', employeeData);
        return response.data.data;
    },

    /**
     * Update an existing employee
     */
    updateEmployee: async (id, employeeData) => {
        const response = await apiClient.put(`/employees/${id}`, employeeData);
        return response.data.data;
    },

    /**
     * Hard delete an employee
     */
    hardDeleteEmployee: async (id) => {
        const response = await apiClient.delete(`/employees/${id}`);
        return response.data;
    },

    /**
     * Soft delete (archive) an employee
     */
    softDeleteEmployee: async (id) => {
        const response = await apiClient.patch(`/employees/${id}/soft-delete`);
        return response.data;
    }
};

export default employeeService;
