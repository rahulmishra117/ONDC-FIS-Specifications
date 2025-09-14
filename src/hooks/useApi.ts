import { useState, useEffect } from 'react';
import { fetchBranches, fetchBuildSpec, Branch, BuildSpec } from '../services/api';

export const useBranches = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBranches = async () => {
      try {
        setLoading(true);
        const data = await fetchBranches();
        setBranches(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load branches');
      } finally {
        setLoading(false);
      }
    };

    loadBranches();
  }, []);

  return { branches, loading, error };
};

export const useBuildSpec = (branch: string) => {
  const [spec, setSpec] = useState<BuildSpec | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!branch) return;

    const loadSpec = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchBuildSpec(branch);
        setSpec(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load specification');
      } finally {
        setLoading(false);
      }
    };

    loadSpec();
  }, [branch]);

  return { spec, loading, error };
};
